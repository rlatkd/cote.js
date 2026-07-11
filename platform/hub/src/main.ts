import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api");
  // arena(Next dev)에서의 브라우저 호출 허용. 운영에선 origin 화이트리스트로 좁힌다.
  app.enableCors({ origin: true });
  const port = process.env.PORT ?? 4000;
  await app.listen(port);
  // eslint-disable-next-line no-console
  console.log(`hub listening on http://localhost:${port}/api`);
}

void bootstrap();
