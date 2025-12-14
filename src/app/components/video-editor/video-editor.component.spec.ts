import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { VideoEditorComponent } from './video-editor.component';
import { AiService } from '../../services/ai.service';
import { signal } from '@angular/core';

describe('VideoEditorComponent', () => {
  let component: VideoEditorComponent;
  let fixture: ComponentFixture<VideoEditorComponent>;
  let mockAiService: any;
  let generateVideosSpy: jasmine.Spy;

  beforeEach(async () => {
    generateVideosSpy = jasmine.createSpy('generateVideos').and.returnValue(Promise.resolve({
        done: true,
        response: { generatedVideos: [{ video: { uri: 'http://example.com/video.mp4' } }] }
    }));

    mockAiService = {
      isAiAvailable: () => true,
      getApiKey: () => 'test-key',
      genAI: {
        models: {
          generateVideos: generateVideosSpy
        },
        operations: {
            getVideosOperation: jasmine.createSpy('getVideosOperation')
        }
      }
    };

    await TestBed.configureTestingModule({
      imports: [VideoEditorComponent],
      providers: [
        { provide: AiService, useValue: mockAiService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(VideoEditorComponent);
    component = fixture.componentInstance;

    // Set required input
    fixture.componentRef.setInput('theme', 'dark');

    fixture.detectChanges();
  });

  it('should use the approved model "veo-2.0-generate-001" for video generation', fakeAsync(() => {
    // Set up inputs for generation
    fixture.componentRef.setInput('imageForVideoGeneration', 'data:image/png;base64,fakebytes');
    component.videoPrompt.set('Test prompt');

    // Trigger generation
    component.generateVideo(true);

    // Wait for async operations
    tick();

    expect(generateVideosSpy).toHaveBeenCalled();
    const args = generateVideosSpy.calls.mostRecent().args[0];
    expect(args.model).toBe('veo-2.0-generate-001');
  }));

  it('should use the approved model "veo-2.0-generate-001" for text-to-video generation', fakeAsync(() => {
    // Set up inputs for generation (no image)
    component.videoPrompt.set('Test prompt');

    // Trigger generation
    component.generateVideo(false);

    // Wait for async operations
    tick();

    expect(generateVideosSpy).toHaveBeenCalled();
    const args = generateVideosSpy.calls.mostRecent().args[0];
    expect(args.model).toBe('veo-2.0-generate-001');
  }));
});
