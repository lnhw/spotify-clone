import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default prisma;

// async function checkConnection() {
//     try {
//         await prisma.$connect();
//         console.log("ket noi db thanh cong");
//     } catch (error) {
//         console.error("Error connection db", error);
//     }
// }
// checkConnection();