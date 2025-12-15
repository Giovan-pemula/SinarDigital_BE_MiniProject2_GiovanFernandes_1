const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('benih mas');

  const categories = await prisma.category.createMany({
    data: [
      { name: 'elektronik' },
      { name: 'BNCC' },
      { name: 'makan' },
      { name: 'gay' }
    ]
  });
  const allCategories = await prisma.category.findMany();


  const products = [];

  for (let i = 1; i <= 20; i++) {
    products.push({
      name: `Product ${i}`,
      price: 10000 * i,
      image: `product-${i}.jpg`,
      video: `video-${i}.mp4`,
      description: `Deskripsi produk ke-${i}`,
      categoryId: allCategories[i % allCategories.length].id //ini buat biar semuanya ga ke eloktronik doang abg abgan er en di
    });
  }

  await prisma.products.createMany({
    data: products
  });

  console.log('✅ Seed success: categories & products created');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
