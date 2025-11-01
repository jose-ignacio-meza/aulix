import express from 'express';
import dotenv from 'dotenv';
import exphbs from 'express-handlebars';
import cookieParser from 'cookie-parser';
import { connectDB } from './config/database.js';
import authRoutes from './routes/auth.routes.js';
import {router as datosPersonales} from './routes/datosPersonales.route.js';
import {router as formularios } from './routes/formularios.routes.js';
import {router as adminRoutes} from './routes/admin.routes.js';
import {router as usuarioRouter} from './routes/usuario.routes.js';
import { verificarToken } from './middlewares/auth.middleware.js';
import path from 'path';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import session from 'express-session';
import flash from 'connect-flash';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Para analizar datos de formularios (x-www-form-urlencoded)
app.use(express.urlencoded({ extended: true }));

// ✅ Para analizar cuerpos JSON
app.use(express.json());

// Servir archivos estáticos
app.use(express.static(path.join(process.cwd(), 'public')));

app.use(cookieParser());

// Handlebars
app.engine('handlebars', exphbs.create({
  partialsDir: './views/partials',
  defaultLayout: 'main',
  helpers: {
    json: function(context) {
      return JSON.stringify(context);
    },
    eq: (a, b) => a === b,
    capitalize: (str) => {
      if (typeof str !== 'string' || !str.length) return '';
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
    or: (a, b) => a || b,
    // 🔹 Helper para comparar y usar selected
    ifCond: function(v1, v2, options) {
      if (v1?.toString() === v2?.toString()) {
        return options.fn(this);
      }
      return options.inverse(this);
    }
  }
}).engine);

app.set('view engine', 'handlebars');
app.set('views', './views');
//Fin config Handlebars

app.use(session({
    secret: 'mi_secreto',
    resave: false,
    saveUninitialized: false
}));

app.use(flash());

// Middleware para pasar los mensajes a las vistas
app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

// Rutas
app.use('', authRoutes);
app.use('/datos-personales', verificarToken, datosPersonales);
app.use('/formularios', verificarToken, formularios);
app.use('/admin', verificarToken, adminRoutes);
app.use('/usuario', verificarToken, usuarioRouter);

connectDB().on('connected', () => {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor en http://localhost:${PORT}/index`);
  });
});
