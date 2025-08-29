import { GuildMember } from 'discord.js'
import { Config } from './configuration'

export class ModerationUtils {
    static isOwner(user: GuildMember): boolean {
        return user.id === Config.OWNER_MEMBER_ID
    }

    static async isModerator(user: GuildMember): Promise<boolean> {
        return user.roles.cache.has(Config.MODERATOR_ROLE_ID) || this.isOwner(user)
    }
}
