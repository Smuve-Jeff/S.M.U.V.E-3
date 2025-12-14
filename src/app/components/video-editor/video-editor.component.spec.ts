import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VideoEditorComponent } from './video-editor.component';
import { AiService } from '../../services/ai.service';
import { AppTheme } from '../../services/user-context.service';

describe('VideoEditorComponent', () => {
  let component: VideoEditorComponent;
  let fixture: ComponentFixture<VideoEditorComponent>;
  let mockAiService: jasmine.SpyObj<AiService>;

  const mockTheme: AppTheme = {
    name: 'Test Theme',
    primary: 'test-primary',
    accent: 'test-accent',
    neutral: 'test-neutral',
    purple: 'test-purple',
    red: 'test-red',
    blue: 'test-blue'
  };

  beforeEach(async () => {
    mockAiService = jasmine.createSpyObj('AiService', ['isAiAvailable', 'getApiKey'], {
        genAI: {
            models: { generateVideos: jasmine.createSpy('generateVideos') },
            operations: { getVideosOperation: jasmine.createSpy('getVideosOperation') }
        }
    });
    mockAiService.isAiAvailable.and.returnValue(false); // Default to unavailable

    await TestBed.configureTestingModule({
      imports: [VideoEditorComponent],
      providers: [
        { provide: AiService, useValue: mockAiService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoEditorComponent);
    component = fixture.componentInstance;

    // Set required input
    fixture.componentRef.setInput('theme', mockTheme);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
