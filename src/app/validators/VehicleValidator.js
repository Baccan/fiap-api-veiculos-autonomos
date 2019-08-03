import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      plate: Yup.string().required(),
      model: Yup.string().required(),
      color: Yup.string().required(),
      year: Yup.number()
        .required()
        .test(
          'len',
          'Must be exactly 4 characters',
          val => val.toString().length === 4
        ),
      category: Yup.string().required(),
      owner: Yup.string().required(),
      brand: Yup.string().required(),
      available: Yup.boolean(),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res
      .status(400)
      .json({ error: 'Validation fails', messages: err.inner });
  }
};
