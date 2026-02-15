const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    console.log('--- Products ---')
    const products = await prisma.product.findMany()
    console.table(products)

    console.log('\n--- Orders ---')
    const orders = await prisma.order.findMany()
    console.table(orders)

    console.log('\n--- Users ---')
    const users = await prisma.user.findMany()
    console.table(users)
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect())
