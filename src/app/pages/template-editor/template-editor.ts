import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Navbar } from '../../components/navbar/navbar';
import { TemplateService } from '../../services/template';
import Quill from 'quill';

@Component({
  selector: 'app-template-editor',
  imports: [Navbar, FormsModule, CommonModule],
  standalone: true,
  templateUrl: './template-editor.html',
  styleUrl: './template-editor.css'
})
export class TemplateEditor implements OnInit, AfterViewInit {
  templateName: string = '';
  errorMessage: string = '';
  successMessage: string = '';
  isEditMode: boolean = false;
  templateId: number | null = null;
  pendingContent: string = '';
  quill: any;

  constructor(
    private templateService: TemplateService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.templateId = this.route.snapshot.params['id'];
    if (this.templateId) {
      this.isEditMode = true;
      this.templateService.getById(this.templateId).subscribe({
        next: (data) => {
          this.templateName = data.name;
          this.cdr.detectChanges();
          if (this.quill) {
            this.quill.root.innerHTML = data.content;
          } else {
            this.pendingContent = data.content;
          }
        }
      });
    }
  }

  ngAfterViewInit() {
    this.quill = new Quill('#editor', {
      theme: 'snow',
      modules: {
        toolbar: [
          [{ header: [1, 2, 3, false] }],
          ['bold', 'italic', 'underline'],
          [{ align: [] }],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['clean']
        ]
      },
      placeholder: 'Write your template here... Use {{name}}, {{date}} for placeholders'
    });

    if (this.pendingContent) {
      this.quill.root.innerHTML = this.pendingContent;
    }

    const interval = setInterval(() => {
      if (this.pendingContent) {
        this.quill.root.innerHTML = this.pendingContent;
        clearInterval(interval);
      }
    }, 100);

    setTimeout(() => clearInterval(interval), 5000);
  }

  save() {
    const content = this.quill.root.innerHTML;

    if (!this.templateName.trim()) {
      this.errorMessage = 'Please enter a template name';
      return;
    }
    if (!content || content === '<p><br></p>') {
      this.errorMessage = 'Please add some content';
      return;
    }

    if (this.isEditMode && this.templateId) {
      this.templateService.update(this.templateId, this.templateName, content).subscribe({
        next: () => {
          window.location.href = '/templates';
        },
        error: () => this.errorMessage = 'Failed to update template'
      });
    } else {
      this.templateService.create(this.templateName, content).subscribe({
        next: () => {
          window.location.href = '/templates';
        },
        error: () => this.errorMessage = 'Failed to create template. Name may already exist.'
      });
    }
  }
}