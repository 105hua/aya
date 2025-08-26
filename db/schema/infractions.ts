import { pgTable, varchar, integer } from 'drizzle-orm/pg-core'

export const infractions = pgTable('infractions', {
    id: varchar('id', { length: 36 }).primaryKey(),
    userId: varchar('user_id', { length: 32 }).notNull(),
    moderatorId: varchar('moderator_id', { length: 32 }).notNull(),
    type: varchar('type', { length: 32 }).notNull(),
    reason: varchar('reason', { length: 255 }).notNull(),
    timestamp: integer('timestamp').notNull(),
    expiresAt: integer('expires_at'),
})
