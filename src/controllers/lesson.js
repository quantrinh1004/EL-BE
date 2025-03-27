const lessonDao = require('../daos/lesson');

const createLesson = async (req, res) => {
  const { title, imageURL } = req.body;
  const lesson = await lessonDao.createLesson({ title, imageURL });
  return res.send({ lesson });
};

const getLessons = async (req, res) => {
  const { search, searchFields, fields, offset, limit, sort } = req.query;
  const query = {};

  query.query = {};
  if (search) query.search = search;
  if (searchFields) query.searchFields = searchFields.split(',');
  if (fields) query.fields = fields.split(',');
  if (offset) query.offset = parseInt(offset, 10);
  if (limit) query.limit = parseInt(limit, 10);
  if (sort) query.sort = sort.split(',');

  Object.keys(req.query)
    .filter(
      (q) =>
        ['search', 'searchFields', 'fields', 'offset', 'limit', 'sort'].indexOf(
          q,
        ) === -1,
    )
    .forEach((q) => {
      query.query[q] = ['true', 'false'].includes(req.query[q])
        ? JSON.parse(req.query[q])
        : req.query[q];
    });

  const { lessons, total } = await lessonDao.findLessons(query);

  return res.send({ lessons, total });
};

const getLesson = async (req, res) => {
  const { id } = req.params;
  const lesson = await lessonDao.getLesson(id);
  return res.send({ lesson });
};

const updateLesson = async (req, res) => {
  const { id } = req.params;
  const updateInfo = req.body;
  const lesson = await lessonDao.updateLesson(id, updateInfo);
  return res.send({ lesson });
};

const deleteLesson = async (req, res) => {
  const { id } = req.params;
  await lessonDao.deleteLesson(id);
  return res.send({});
};

module.exports = {
  createLesson,
  getLessons,
  getLesson,
  updateLesson,
  deleteLesson,
};
