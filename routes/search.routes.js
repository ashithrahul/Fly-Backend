import { Router} from 'express';
import SearchController from '../controllers/search.controller.js';
const searchController = new SearchController();

const router = Router();

router.get(
  '/suggestions',
  (req, res) => searchController.getSuggestions(req, res)
);
 


router.get(
  '/search',
  (req, res) => searchController.searchDetails(req, res)
);


export default router;
