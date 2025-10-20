# Fly-Backend

App for handling the backedn service for Fly App


## Tech Stack

- **Runtime**: Node.js 18+
- **Framework**: Express.js 5.x
- **Database**: MySQL 8.x
- **ORM**: Sequelize 6.x
- **Validation**: Custom middleware + validator.js
- **Container**: Docker & Docker Compose


## Installation

### Prerequisites
- Node.js 18 or higher
- MySQL 8.0 or higher
- npm or yarn

### Local Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/ashithrahul/Fly-Backend.git
   cd Fly-Backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Set up MySQL database**
   ```sql
   CREATE DATABASE fly;
   CREATE USER 'flyuser'@'localhost' IDENTIFIED BY 'your_password';
   GRANT ALL PRIVILEGES ON fly.* TO 'flyuser'@'localhost';
   FLUSH PRIVILEGES;
   ```
   Use the [sql dump](https://github.com/ashithrahul/Fly-App/blob/main/items_backup.sql) file to prepopulate the data, Since data will be empty in the initial setup


5. **Start the application**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## Environment Setup

Create a `.env` file in the root directory:

```env
# Database Configuration
DB_NAME=fly
DB_USER=flyuser
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=3306

# Server Configuration
PORT=1001
NODE_ENV=development

# CORS Configuration
FRONTEND_URL=http://localhost:3000
```

## 📚 API Endpoints

### Base URL
```
http://localhost:1001/api
```