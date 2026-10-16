"""Optimiser les copies diffusées ; ne jamais modifier les affiches originales."""
from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parents[1]
mapping = {
    'Bases du prompt _ créer avec l’IA.png': 'seance-05-bases-prompt',
    'Affiche LN-IA _ Module 02, Semaine 03 (1).png': 'module-02-semaines-03-04',
    'Affiche pédagogique IA _ prompts et dialogue.png': 'module-02-vue-ensemble',
    'Atelier IA _ du prompt simple au prompt structuré.png': 'seance-06-prompt-structure',
    'Contrôle et validation _ la clé du livrable.png': 'seance-08-controle-validation',
    'Du prompt simple au prompt structuré.png': 'seance-06-reprise-pratique',
    'Séance 07 — Maîtriser le prompt personnel.png': 'seance-07-prompt-maitre',
}
destination = root / 'public' / 'assets' / 'affiches'
destination.mkdir(parents=True, exist_ok=True)
for original, name in mapping.items():
    with Image.open(root / 'affiches' / original) as image:
        image = image.convert('RGB')
        image.thumbnail((1400, 1800))
        image.save(destination / f'{name}.webp', 'WEBP', quality=88, method=6)
        print(name)
