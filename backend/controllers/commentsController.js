const Comment = require('../models/Comment');

exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.find();
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getCommentById = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    res.json(comment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createComment = async (req, res) => {
  const comment = new Comment({
    name: req.body.name,
    comment: req.body.comment,
    rating: req.body.rating,
    pageId: req.body.pageId,
    email: req.body.email,
  });

  try {
    const newComment = await comment.save();
    res.status(201).json(newComment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    comment.name = req.body.name || comment.name;
    comment.comment = req.body.comment || comment.comment;
    comment.rating = req.body.rating || comment.rating;
    comment.pageId = req.body.pageId || comment.pageId;
    comment.email = req.body.email || comment.email;

    const updatedComment = await comment.save();
    res.json(updatedComment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteComment = async (req, res) => {
    try {
      const email = req.body.email;
      const comment = await Comment.findOne({ email: email, _id: req.params.id });
      if (!comment) {
        return res.status(404).json({ message: 'Comment not found' });
      }
      await Comment.deleteOne({ _id: req.params.id });
      res.json({ message: 'Comment deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  

  