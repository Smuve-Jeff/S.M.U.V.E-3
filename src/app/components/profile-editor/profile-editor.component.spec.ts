import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileEditorComponent } from './profile-editor.component';
import { UserProfileService } from '../../services/user-profile.service';
import { AppTheme, UserContextService } from '../../services/user-context.service';

describe('ProfileEditorComponent', () => {
  let component: ProfileEditorComponent;
  let fixture: ComponentFixture<ProfileEditorComponent>;
  let mockUserProfileService: any;
  let mockUserContextService: any;

  beforeEach(async () => {
    mockUserProfileService = {
      profile: jasmine.createSpy('profile').and.returnValue({
        artistName: 'Test Artist',
        primaryGenre: 'Test Genre',
        secondaryGenres: [],
        skills: [],
        careerGoals: [],
        currentFocus: '',
        influences: '',
        bio: '',
        links: {}
      }),
      updateProfile: jasmine.createSpy('updateProfile')
    };

    mockUserContextService = {
        lastUsedTheme: jasmine.createSpy('lastUsedTheme').and.returnValue({
            name: 'Test Theme',
            primary: 'blue',
            accent: 'cyan',
            neutral: 'slate',
            purple: 'purple',
            red: 'red',
            blue: 'blue'
        })
    };

    await TestBed.configureTestingModule({
      imports: [ProfileEditorComponent],
      providers: [
        { provide: UserProfileService, useValue: mockUserProfileService },
        { provide: UserContextService, useValue: mockUserContextService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileEditorComponent);
    component = fixture.componentInstance;
    // Set the required input
    fixture.componentRef.setInput('theme', {
        name: 'Test Theme',
        primary: 'blue',
        accent: 'cyan',
        neutral: 'slate',
        purple: 'purple',
        red: 'red',
        blue: 'blue'
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
