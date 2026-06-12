import prisma from '../lib/services/prismaClient.js';

export default class AlunosModel {
    constructor({ id = null, nome, turma, materia } = {}) {
        this.id = id;
        this.nome = nome;
        this.turma = turma;
        this.materia = materia;
    }

    async criar() {
        return prisma.alunos.create({
            data: {
                nome: this.nome,
                turma: this.turma,
                materia: this.materia,
            },
        });
    }

    async atualizar() {
        return prisma.alunos.update({
            where: { id: this.id },
            data: { nome: this.nome, turma: this.turma, materia: this.materia },
        });
    }

    async deletar() {
        return prisma.alunos.delete({ where: { id: this.id } });
    }

    static async buscarTodos(filtros = {}) {
        const where = {};

        if (filtros.nome) {
            where.nome = { contains: filtros.nome, mode: 'insensitive' };
        }
        if (filtros.turma !== undefined) {
            where.turma = filtros.turma === 'true';
        }
        if (filtros.materia !== undefined) {
            where.materia = parseFloat(filtros.materia);
        }

        return prisma.alunos.findMany({ where });   
    }

    static async buscarPorId(id) {
        const data = await prisma.alunos.findUnique({ where: { id } });
        if (!data) {
            return null;
        }
        return new AlunosModel(data);
    }
}
