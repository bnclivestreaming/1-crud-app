import { Router, Request, Response, NextFunction } from 'express';
import { User } from '../../model';

const router = Router();

// READ
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  const users = await User.find();

  if (users.length <= 0) {
    return res.json({
      data: null,
      msg: 'No User Found',
    });
  }

  res.json({
    data: users,
    msg: 'successfully retrieved',
  });
});

// CREATE
router.post('/add', async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const user = new User({
    name,
    email,
    password,
  });

  await user
    .save()
    .then(() => {
      res.json({
        data: 'Data added',
      });
    })
    .catch((err) => {
      res.json({
        data: null,
        error: err,
      });
    });
});

// DELETE
router.delete('/delete/:Id', async (req: Request, res: Response) => {
  const id = req.params.Id;

  const currentUser: any = await User.findById(id);

  await User.findByIdAndDelete(id)
    .then(() => {
      res.json({
        msg: `${currentUser.name} is deleted`,
      });
    })
    .catch((err) => {
      res.json({
        msg: err,
      });
    });
});

// UPDATE
router.put('/update/:Id', async (req: Request, res: Response) => {
  const id = req.params.Id;
  const { name, email, password } = req.body;

  const currentUser = await User.findById(id);

  if (!currentUser) {
    return res.json({
      msg: 'No User Found',
    });
  }

  await currentUser
    .update({
      name,
      email,
      password,
    })
    .then(() => {
      res.json({
        msg: `${name} updated`,
      });
    })
    .catch((err) => {
      res.json({
        error: err,
      });
    });
});

export default router;
