# Angular Portfolio with NgRx State Management

Portfolio website built with Angular 19 dan NgRx untuk demonstrasi state management yang komprehensif.

## 🚀 Features

- **Modern Angular 19** dengan standalone components
- **NgRx State Management** untuk pengelolaan state yang predictable
- **Tailwind CSS** untuk styling yang responsive dan modern
- **TypeScript** untuk type safety
- **Server-Side Rendering (SSR)** untuk performance optimal
- **Redux DevTools** integration untuk debugging

## 📱 Demo Pages

1. **Home** (`/`) - Hero section dengan routing
2. **About** (`/about`) - Portfolio information dengan data dari NgRx store
3. **Admin Demo** (`/admin`) - Interactive demo untuk state management

## 🛠️ Technologies Used

- **Angular 19** - Frontend framework
- **NgRx 19** - State management library
- **Tailwind CSS** - Utility-first CSS framework
- **TypeScript** - Programming language
- **RxJS** - Reactive programming library

## 🏗️ Project Structure

```
src/app/
├── components/
│   ├── about/           # About page dengan NgRx integration
│   ├── admin/           # Admin demo untuk state management
│   └── hero/            # Landing page
├── models/
│   └── portfolio.model.ts    # TypeScript interfaces
├── services/
│   └── portfolio.service.ts  # Data service untuk API simulation
└── store/
    ├── index.ts              # Store configuration
    └── portfolio/
        ├── portfolio.actions.ts     # NgRx actions
        ├── portfolio.reducer.ts     # NgRx reducer
        ├── portfolio.selectors.ts   # NgRx selectors
        └── portfolio.effects.ts     # NgRx effects
```

## 🚀 Getting Started

### Prerequisites

- Node.js (version 18 atau lebih baru)
- npm atau yarn

### Installation

1. Clone repository
```bash
git clone <repository-url>
cd angular-starter
```

2. Install dependencies
```bash
npm install
```

3. Run development server
```bash
npm start
```

Buka browser dan akses `http://localhost:4200`

### Alternative Port

Jika port 4200 sudah digunakan:
```bash
ng serve --port 4201
```

## 📚 State Management Implementation

### NgRx Setup

Project ini menggunakan NgRx untuk state management dengan struktur:

- **Actions**: Events yang mendeskripsikan perubahan state
- **Reducers**: Pure functions yang mengubah state
- **Effects**: Side effects seperti API calls
- **Selectors**: Functions untuk mengambil data dari state

### Key Features

1. **Portfolio State Management**
   - Personal information
   - Skills dengan kategori dan level
   - Projects dengan metadata

2. **Loading & Error Handling**
   - Loading states untuk UX yang better
   - Error handling dengan retry functionality

3. **Real-time Updates**
   - State changes reflected immediately di UI
   - Memoized selectors untuk performance

### Redux DevTools

Install Redux DevTools browser extension untuk debugging:
- Time-travel debugging
- Action replay
- State inspection

## 🧪 Testing State Management

Gunakan halaman **Admin Demo** (`/admin`) untuk testing:

1. **Personal Info Updates** - Update personal information
2. **Skills Management** - Add new skills dengan categories
3. **State Debugging** - Monitor state changes real-time

## 📖 Documentation

Lihat `STATE_MANAGEMENT.md` untuk dokumentasi lengkap tentang:
- NgRx architecture patterns
- Best practices
- Testing strategies
- Performance optimization

## 🎯 Learning Objectives

Project ini dirancang untuk pembelajaran Angular state management:

1. **NgRx Fundamentals** - Actions, Reducers, Effects, Selectors
2. **Angular Architecture** - Component communication dengan state
3. **TypeScript Integration** - Type-safe state management
4. **Performance Patterns** - Memoized selectors dan OnPush strategy
5. **Developer Experience** - Debugging dengan Redux DevTools

## 🛠️ Development Commands

```bash
# Development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Build and serve SSR
npm run serve:ssr:angular-starter
```

## 📈 Next Steps

1. **Add API Integration** - Replace mock service dengan real API
2. **Implement CRUD Operations** - Full create, read, update, delete
3. **Add Authentication** - User management dengan NgRx
4. **Performance Optimization** - OnPush change detection
5. **Testing** - Unit dan integration tests untuk store

## 📝 Notes

- Project menggunakan Angular 19 dengan standalone components
- NgRx version 19 untuk kompatibilitas dengan Angular 19
- Tailwind CSS sudah dikonfigurasi untuk modern styling
- SSR (Server-Side Rendering) enabled untuk SEO optimization

## 🤝 Contributing

1. Fork repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License.

---

**Happy learning Angular & NgRx! 🚀**
