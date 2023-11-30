import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('status')
@Controller('status')
export class StatusController {

    @Get()
    async statusCheck(){
        return 
    }


}
