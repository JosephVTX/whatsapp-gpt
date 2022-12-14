export const getCommand = (totalCommand: string): { command: string, parameter: string } => {

    totalCommand = totalCommand.trim()
    const command: string = totalCommand.split(" ")[0]
    const parameter: string = totalCommand.replace(command, "").trim()

    return {

        command,
        parameter
    }

}

