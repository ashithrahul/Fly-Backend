import { Router} from 'express';

const router = Router();

router.get(
  '/suggestions',
  (req, res) => {
    res.json({ message: 'Suggestions endpoint' });
  }
);


router.get(
  '/search',
   (req, res) => {
    res.json({ message: 'search endpoint' });
  }
);

export default router;
