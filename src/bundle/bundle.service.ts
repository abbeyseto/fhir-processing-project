import { Injectable } from '@nestjs/common';
import { Client } from 'cassandra-driver';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class BundleService {
    private readonly client: Client;
    private lastProcessedEntryId: string;
    private processCount = 0;

    constructor() {
        this.client = new Client({
            contactPoints: ['localhost'], // Replace with your Cassandra contact points
            localDataCenter: 'datacenter1', // Replace with your Cassandra data center
            keyspace: 'saffron', // Replace with your keyspace name
        });
        this.initializeLastProcessedEntryId().then(() => {
            // The initialization is complete, and the lastProcessedEntryId is available here
            console.log('BundleService initialized. Last processed entry ID: ', this.lastProcessedEntryId?.toString());
        });
    }

    private async initializeLastProcessedEntryId(): Promise<void> {
        this.lastProcessedEntryId = await this.getLastProcessedEntryId();
    }


    //   Save the each bundle entry to Cassandra
    async saveEntry(entry: any): Promise<void> {
        const query = 'INSERT INTO patient_queues (id, entry) VALUES (?, ?);';
        const params = [uuidv4(), JSON.stringify(entry)];
        await this.client.execute(query, params, { prepare: true });
    }


    async processEntries(): Promise<void> {
        const query = 'SELECT id, entry FROM patient_queues LIMIT 10;';
        // const params = [this.lastProcessedEntryId];
        const result = await this.client.execute(query, { prepare: true });
        const rows = result.rows;

        if (rows.length > 0) {
            for (const row of rows) {
                const entryId = row['id'].toString();
                const entry = JSON.parse(row['entry'].toString());
                try {
                    console.log('Processing entries');
                    await this.processEntry(entry);
                    await this.deleteEntry(entryId);
                    await this.updateLastProcessedEntryId(entryId);
                } catch (error) {
                    console.log('Error processing entry:', entry);
                    console.log('Error:', error);
                }
            }
        } else {
            console.log('No entries to process on Cassandra');
        }
    }


    async processEntry(entry: any): Promise<void> {
        // Implement your logic to process and store the entry in the FHIR server
        // This is just a placeholder example
        this.processCount++;
        if (this.processCount === 10) {
            console.log('ProcessCount is 10. Simulating error processing entry:', entry);
            // Reset the process count
            this.processCount = 0;
            // dont stop server on error - just log it
            throw new Error('Simulated error processing entry');

        }
        console.log('Processing entry:', entry);
    }


    async deleteEntry(entryId: string): Promise<void> {
        console.log('Deleting entry:', entryId);
        const query = 'DELETE FROM patient_queues WHERE id = ?;';
        const params = [entryId];
        await this.client.execute(query, params, { prepare: true });
    }

    async getLastProcessedEntryId(): Promise<string> {
        const query = 'SELECT last_processed_entry_id FROM control_table WHERE control_id = 1;';
        const result = await this.client.execute(query);
        const row = result.first();

        if (row) {
            return row['last_processed_entry_id'];
        } else {
            return null;
        }
    }

    async updateLastProcessedEntryId(entryId: string): Promise<void> {
        console.log('Updating last processed entry ID:', entryId);
        const query = 'UPDATE control_table SET last_processed_entry_id = ? WHERE control_id = 1;';
        const params = [entryId];
        await this.client.execute(query, params, { prepare: true });
    }
}
