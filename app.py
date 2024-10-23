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
    file_name = request.form.get('file_name')
    email = request.form.get('email')
    phone = request.form.get('phone')
    location = request.form.get('location')
    linkedin = request.form.get('linkedin')
    github = request.form.get('github')
    website = request.form.get('website')
    summary = request.form.get('summary')

    # education data
    education_school = request.form.get('education_school')
    education_start_date = request.form.get('education_start_date')
    education_end_date = request.form.get('education_end_date')
    education_location = request.form.get('education_location')
    education_degree = request.form.get('education_degree')
    education_coursework = request.form.get('education_coursework')

    # experience data
    experience_company = request.form.get('experience_company')
    experience_start_date = request.form.get('experience_start_date')
    experience_end_date = request.form.get('experience_end_date')
    experience_location = request.form.get('experience_location')
    experience_position = request.form.get('experience_position')
    experience_bullet_points = request.form.get('experience_bullet_points')

    # project data
    project_name = request.form.get('project_name')
    project_start_date = request.form.get('project_start_date')
    project_end_date = request.form.get('project_end_date')
    project_bullet_points = request.form.get('project_bullet_points')

    # Collecting skills (assuming skills are collected in a different way)
    skills = request.form.getlist('skills')  # This will now work correctly

    # Collecting user data
    email = request.form.get('email')
    phone = request.form.get('phone')
    location = request.form.get('location')
    linkedin = request.form.get('linkedin')
    github = request.form.get('github')
    website = request.form.get('website')

    # Constructing author_info to include all relevant details in a tabular format
    author_info = []
    if email:
        author_info.append(email)
    if phone:
        author_info.append(phone)
    if location:
        author_info.append(location)
    if linkedin:
        author_info.append(linkedin)
    if github:
        author_info.append(github)
    if website:
        author_info.append(website)

    # Create a LaTeX tabular structure for the author information
    if author_info:
        author_info_latex = r'\begin{tabular}{ccc}' + '\n'  # Start a 3-column table
        author_info_latex += r' \hspace{1cm} '.join(author_info[:3]) + r' \\' + '\n'  # First row
        author_info_latex += r' \hspace{1cm} '.join(author_info[3:]) + r' \\' + '\n'  # Second row
        author_info_latex += r'\end{tabular}'  # End the table
    else:
        author_info_latex = "Author"

    # Create LaTeX document
    doc = Document()

    # Add geometry package with desired margins
    doc.preamble.append(Command('usepackage', 'geometry'))
    doc.preamble.append(Command('geometry', NoEscape('margin=1in')))  # Set all margins to 1 inch

    # Add user details to LaTeX document
    doc.preamble.append(Command('title', name))
    doc.preamble.append(Command('author', NoEscape(author_info_latex)))
    doc.append(NoEscape(r'\maketitle'))

    # Add Summary
    with doc.create(Section('Summary')):
        doc.append(summary)

    # Add Education Section without numbering
    with doc.create(Section('Education')):
        doc.append(NoEscape(education_degree + r' \\ '))  
        doc.append(NoEscape(education_school + r' \\ '))   
        doc.append(NoEscape(education_location + r' \\ '))  
        doc.append(NoEscape(f"({education_start_date} - {education_end_date})" + r' \\ '))  
        doc.append(NoEscape(education_coursework + r' \\ ')) 
    
    # Add Experience Section
    with doc.create(Section('Experience')):
        doc.append(NoEscape(experience_company + r' \\ '))
        doc.append(NoEscape(experience_position + r' \\ '))     
        doc.append(NoEscape(experience_location + r' \\ '))  
        doc.append(NoEscape(f"({experience_start_date} - {experience_end_date})" + r' \\ '))  
        doc.append(NoEscape(experience_bullet_points + r' \\ ')) 

    # Add Projects Section
    with doc.create(Section('Projects')):
        doc.append(NoEscape(project_name + r' \\ '))  
        doc.append(NoEscape(f"({project_start_date} - {project_end_date})" + r' \\ '))
        doc.append(NoEscape(project_bullet_points + r' \\ '))  

    # Add Skills Section
    with doc.create(Section('Skills')):
        doc.append(', '.join(skills))  # Adjust based on how you want to format skills

    # Generate PDF file
    pdf_filename = f'{file_name}.pdf'
    doc.generate_pdf(pdf_filename, clean_tex=False, compiler='pdflatex')

    # Send the generated PDF file to the user
    return send_file(pdf_filename, as_attachment=True)

if __name__ == '__main__':
    app.run(debug=True, port=5001)  # Change to a different port
