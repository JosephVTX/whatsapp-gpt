import {config} from 'dotenv'
import path from 'path'


config({path: path.resolve(__dirname, '../../.env')})


const ENV = {

    clearanceToken: process.env.CLEARANCE_TOKEN || "",
    sessionToken0: process.env.SESSION_TOKEN || ""
}

export default ENV