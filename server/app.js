const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const userRouter = require('./routes/userRoutes');
const cacheRouter = require('./routes/cacheRoutes');
const metadataRouter = require('./routes/metadataRoutes');
const scanRouter = require('./routes/scanRoutes');
const targetRouter = require('./routes/targetRoutes');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

/* === GLOBAL MIDDLEWARE ===*/
// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

// Set security HTTP headers
app.use(helmet({ contentSecurityPolicy: false }));

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Limit requests from same API
/* const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000, // 1 hour window
  message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/api', limiter); */

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '50kb' }));
app.use(express.urlencoded({ extended: true, limit: '50kb' }));
//Reading cookies
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Add time stamp to request
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// Mount Routers
app.use('/api/users', userRouter);
app.use('/api/caches', cacheRouter);
app.use('/api/metadata', metadataRouter);
app.use('/api/targets', targetRouter);
app.use('/api/scans', scanRouter);

// If no routes are matched, send 404
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
// Global error handler
app.use(globalErrorHandler);
module.exports = app;
