from flask import Flask, request, render_template, send_file
from pylatex import Document, Section, Command
from pylatex.utils import NoEscape
import os

app = Flask(__name__)

# Route for rendering the front-end
@app.route('/')
def index():
    return render_template('index.html')

# Route for handling form submission and generating PDF
@app.route('/generate_resume', methods=['POST'])
def generate_resume():
    # Collect user data from the form
    name = request.form.get('name')
    email = request.form.get('email')
    phone = request.form.get('phone')
    location = request.form.get('location')
    linkedin = request.form.get('linkedin')
    github = request.form.get('github')
    summary = request.form.get('summary')
    education = request.form.get('education')
    work_experience = request.form.get('work_experience')
    projects = request.form.get('projects')
    skills = request.form.get('skills')

    # Create LaTeX document
    doc = Document()

    # Add user details to LaTeX document
    doc.preamble.append(Command('title', name))
    doc.preamble.append(Command('author', NoEscape(email + ' \\ ' + phone)))
    doc.preamble.append(Command('date', NoEscape(location)))
    doc.append(NoEscape(r'\maketitle'))

    with doc.create(Section('Summary')):
        doc.append(summary)

    with doc.create(Section('Education')):
        doc.append(education)

    with doc.create(Section('Work Experience')):
        doc.append(work_experience)

    with doc.create(Section('Projects')):
        doc.append(projects)

    with doc.create(Section('Skills')):
        doc.append(skills)

    # Generate PDF file
    pdf_filename = 'resume.pdf'
    doc.generate_pdf(pdf_filename, clean_tex=False,compiler='pdflatex')

    # Send the generated PDF file to the user
    return send_file(pdf_filename, as_attachment=True)

if __name__ == '__main__':
    app.run(debug=True)
