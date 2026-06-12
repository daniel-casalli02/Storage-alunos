import prisma from '../lib/services/prismaClient.js';

export default class AlunosModel {
    constructor({ id = null, nome, turma, materia, foto = null } = {}) {
        this.id = id;
        this.nome = nome;
        this.turma = turma;
        this.materia = materia;
        this.foto = foto;
    }

    async criar() {
        return prisma.alunos.create({
            data: {
                nome: this.nome,
                turma: this.turma,
                materia: this.materia,
                foto: this.foto,
            },
        });
    }

    async atualizar() {
        return prisma.alunos.update({
            where: { id: this.id },
            data: { nome: this.nome, turma: this.turma, materia: this.materia, foto: this.foto },
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
            where.materia = filtros.materia === 'true';
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
