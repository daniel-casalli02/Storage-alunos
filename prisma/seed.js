import pg from 'pg';
import 'dotenv/config';
import pkg from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const { PrismaClient } = pkg;
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log('🌱 Resetando tabela alunos...');

    // Remove todos os registros
    // await prisma.alunos.deleteMany();

    console.log('📦 Inserindo novos registros...');

    await prisma.alunos.createMany({
        data: [
            { nome: 'alunos Alphas', turma: '2tds1', materia: 'Back-end' },
            { nome: 'alunos Betas', turma: '2tds2', materia: 'Front-end' },
        ],
    });

    console.log('✅ Seed concluído!');
}

main()
    .catch((e) => {
        console.error('❌ Erro no seed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
