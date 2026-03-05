import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';

// Configuration
import { appConfig, databaseConfig, jwtConfig, redisConfig } from './config';

// Modules
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { SkillsModule } from './skills/skills.module';
import { ExperienceModule } from './experience/experience.module';
import { ProjectsModule } from './projects/projects.module';
import { BooksModule } from './books/books.module';
import { QuotesModule } from './quotes/quotes.module';
import { QuestsModule } from './quests/quests.module';
import { TimelineModule } from './timeline/timeline.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { MediaModule } from './media/media.module';

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig, jwtConfig, redisConfig],
      envFilePath: ['.env', '.env.local'],
    }),
    
    // Rate limiting
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 1000,
        limit: 10,
      },
      {
        name: 'long',
        ttl: 60000,
        limit: 100,
      },
    ]),
    
    // Feature modules
    AuthModule,
    ProfileModule,
    SkillsModule,
    ExperienceModule,
    ProjectsModule,
    BooksModule,
    QuotesModule,
    QuestsModule,
    TimelineModule,
    AnalyticsModule,
    MediaModule,
  ],
})
export class AppModule {}
