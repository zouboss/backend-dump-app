import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) {}

    async register(email: string, password: string): Promise<User> {
        const existingUser = await this.usersService.findByEmail(email);
        if (existingUser) {
            throw new ConflictException('ce compte existe déjà');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        return this.usersService.create(email, hashedPassword);
    }

    async login(email: string, password: string): Promise<{ access_token: string }> {
        const user = await this.usersService.findByEmail(email);
        if (!user) {
          throw new UnauthorizedException('Données incorrectes');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          throw new UnauthorizedException('Données incorrectes');
        }
        // Générer le JWT
        const payload = { sub: user.id, email: user.email };
        const token = await this.jwtService.signAsync(payload);
        return { access_token: token };
    }
}
