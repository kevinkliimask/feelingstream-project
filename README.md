## Deployed website link
https://feelingstream-project-frontend.vercel.app/
## Run with docker
```
docker-compose -f docker_compose.yml up
```
Website should be available on http://localhost:8080/
## Run in development mode
Install postgres to your machine and start it. Make sure `DATABASE_URL` in `.env` is correct, you might need to change the username, password or database name.

In the backend folder run
```
flask db upgrade
flask run
```

In the frontend folder run
```
npm run install
npm run dev
```

Website should be available on http://localhost:8080/

## Known bugs and issues
- Could not get JWT authentication working, I probably missed something trivial (I tried using `@jwt_required()` decorator on endpoints)
- Edit interaction dialogue input fields are buggy, no spaces can be entered
- Dialogues don't reset state after closing
- When dockerizing the application, frontend is not set up to always server the same `index.html`, for example, when directly visiting http://localhost:8080/customers from browser you are directed to a 404 page.