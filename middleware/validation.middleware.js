import validator from 'validator';

// middle ware used to validate the input request from api call
export const validateSearchQuery = (req, res, next) => {
  const { q: searchQuery, page, limit } = req.query;

   const trimmedQuery = searchQuery.trim();

  if (trimmedQuery.length > 100) {
    return res.status(400).json({
      success: false,
      message: 'Search query is too long. Maximum 100 characters allowed',
      error: 'QUERY_TOO_LONG'
    });
  }

  if (page && (!validator.isInt(page.toString(), { min: 1 }))) {
    return res.status(400).json({
      success: false,
      message: 'Page must be a positive integer',
      error: 'INVALID_PAGE'
    });
  }


  req.cleanedQuery = trimmedQuery;
  next();
};

export const sanitizeInput = (req, res, next) => {
  if (req.query.q) {
    // Remove HTML tags and dangerous characters
    req.query.q = validator.escape(req.query.q);
    
    // Remove SQL injection patterns
    req.query.q = req.query.q.replace(/['";\\]/g, '');
    
    // Remove script tags and javascript
    req.query.q = req.query.q.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    
    // Limit special characters
    req.query.q = req.query.q.replace(/[<>{}[\]]/g, '');
  }
  
  next();
};