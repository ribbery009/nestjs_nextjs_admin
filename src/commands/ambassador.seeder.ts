import { NestFactory } from "@nestjs/core";
import { AppModule } from "../app.module";
import { UserService } from '../user/user.service'
import * as bcrypt from "bcryptjs";
import { faker } from '@faker-js/faker';

(async () => {
    const app = await NestFactory.createApplicationContext(AppModule)

    const userService = app.get(UserService);

    const password = await bcrypt.hash("12345678A", 12);
    for (let i = 0; i < 30; i++) {
        await userService.save({
            first_name: faker.name.firstName(),
            last_name: faker.name.lastName(),
            email: faker.internet.email(),
            password,
            is_ambassador: true
        })
    }

    process.exit();
})();
