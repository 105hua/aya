import fs from 'fs/promises'
import path from 'path'

export async function getSystemPrompt(promptName: string): Promise<string> {
    const filePath = path.join(__dirname, '..', '..', 'sys_prompts', `${promptName}.md`)
    if (!(await fs.exists(filePath))) {
        throw new Error(`System prompt file not found: ${filePath}`)
    }
    return await fs.readFile(filePath, 'utf-8')
}
