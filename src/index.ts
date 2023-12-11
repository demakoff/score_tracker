import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // ... you will write your Prisma Client queries here
  
  // await prisma.games.create({
  //   data: {
  //     teamOneName: "team1",
  //     teamTwoName: "team2",
  //   },
  // });

  // const allUsers = await prisma.games.findMany();
  // console.log(allUsers);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
