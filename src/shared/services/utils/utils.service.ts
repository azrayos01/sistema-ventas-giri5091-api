import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { jwtConstants } from 'src/constants/jwt.constants';

@Injectable()
export class UtilsService {

    constructor(private jwtSvc: JwtService) { }

    async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, 10);
     }

    async checkPassword(password: string, encryptedPassword: string): Promise<boolean> {
        return await bcrypt.compareSync(password, encryptedPassword);
     }

    async generateJWT(payload: any): Promise<string> {
        var jwt = await this.jwtSvc.signAsync(payload, { secret: jwtConstants.secret});

        return jwt;
     }

    async getPayload(jwt: string): Promise<any> {
        var payload = await this.jwtSvc.verifyAsync(jwt, { secret: jwtConstants.secret});
        const { iat, exp, ...data } = payload;

        return data;
     }

}
