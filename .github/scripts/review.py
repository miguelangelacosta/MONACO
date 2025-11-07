from openai import OpenAI
import os, subprocess

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# Obtener los cambios (diff) del PR
diff = subprocess.getoutput("git diff HEAD~1 HEAD")

# Enviar los cambios a ChatGPT para revisión
response = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[
        {"role": "system", "content": "Eres un revisor de código experto. Analiza calidad, seguridad y buenas prácticas."},
        {"role": "user", "content": f"Revisa este diff y escribe sugerencias claras y concisas:\n\n{diff}"}
    ]
)

print("💬 Comentarios de la IA:\n")
print(response.choices[0].message.content)
