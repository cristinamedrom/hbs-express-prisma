const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
    try {
      const posts = await prisma.post.findMany();
      res.render('home', { posts, pageTitle: 'Lista de Posts' });
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los posts' });
    }
  });

router.post('/', async (req, res) => {
  const { title, content, published } = req.body;
  try {
    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        published,
      },
    });
    res.json(newPost);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el post' });
  }
});

router.get('/:id', async (req, res) => {
  const postId = req.params.id;
  try {
    const post = await prisma.post.findUnique({
      where: { id: postId },
    });
    if (!post) {
      res.status(404).json({ error: 'Post no encontrado' });
    } else {
      res.json(post);
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el post' });
  }
});

router.put('/:id', async (req, res) => {
  const postId = req.params.id;
  const { title, content, published } = req.body;
  try {
    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: {
        title,
        content,
        published,
      },
    });
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el post' });
  }
});

router.delete('/:id', async (req, res) => {
  const postId = req.params.id;
  try {
    const deletedPost = await prisma.post.delete({
      where: { id: postId },
    });
    res.json(deletedPost);
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el post' });
  }
});

module.exports = router;
