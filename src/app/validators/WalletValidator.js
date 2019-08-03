import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      number: Yup.number()
        .required()
        .test(
          'len',
          'Must be exactly 16 characters',
          val => val.toString().length === 16
        ),
      flag: Yup.string().required(),
      verification_code: Yup.number()
        .required()
        .test(
          'len',
          'Must be exactly 3 characters',
          val => val.toString().length === 3
        ),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res
      .status(400)
      .json({ error: 'Validation fails', messages: err.inner });
  }
};
