import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { UserContextService } from './services/user-context.service';
import { UserProfileService } from './services/user-profile.service';
import { AiService } from './services/ai.service';
import { signal } from '@angular/core';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    // Mock services
    const aiServiceMock = {
      isAiAvailable: signal(false)
    };
    const userContextMock = {
      setMainViewMode: jasmine.createSpy('setMainViewMode'),
      setTheme: jasmine.createSpy('setTheme'),
      setLastImageUrl: jasmine.createSpy('setLastImageUrl'),
      lastUsedTheme: signal(null),
      lastGeneratedImageUrl: signal(null)
    };
    const userProfileMock = {
      profile: signal({
        artistName: 'Test Artist',
        primaryGenre: 'Test Genre',
        skills: [],
        careerGoals: [],
        currentFocus: '',
        links: {}
      })
    };

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        { provide: AiService, useValue: aiServiceMock },
        { provide: UserContextService, useValue: userContextMock },
        { provide: UserProfileService, useValue: userProfileMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct initial view mode', () => {
    expect(component.mainViewMode()).toBe('player');
  });

  it('should toggle chatbot', () => {
    const initialState = component.showChatbot();
    component.toggleChatbot();
    expect(component.showChatbot()).not.toBe(initialState);
  });
});
