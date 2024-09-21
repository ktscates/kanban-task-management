import { ComponentFixture, TestBed } from '@angular/core/testing'
import { AppComponent } from './app.component'
import { HttpClientModule } from '@angular/common/http'

describe('AppComponent', () => {
  let component: AppComponent
  let fixture: ComponentFixture<AppComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, HttpClientModule],
    }).compileComponents()

    fixture = TestBed.createComponent(AppComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should set theme from local storage', () => {
    localStorage.setItem('darkMode', 'true')
    component.ngOnInit()
    expect(component.switchedToDarkMode).toBe(true)
    expect(document.body.classList.contains('dark')).toBe(true)
  })

  it('should change themes', () => {
    component.switchedToDarkMode = false
    component.switchThemes()
    expect(component.switchedToDarkMode).toBe(true)
    component.switchedToDarkMode = true
    component.switchThemes()
    expect(component.switchedToDarkMode).toBe(false)
  })
})
