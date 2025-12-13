#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script para convertir emojis a iconos Font Awesome en el archivo equipos.js
"""

def convert_emojis_to_icons():
    # Diccionario de conversión emoji -> icono Font Awesome
    emoji_to_icon = {
        # Armas
        '🐙': '<i class="fas fa-octopus"></i>',  # Kraken
        '⚡': '<i class="fas fa-bolt"></i>',      # Rayo/Tormenta
        '⚓': '<i class="fas fa-anchor"></i>',    # Ancla
        '🦈': '<i class="fas fa-fish"></i>',     # Tiburón/Pez
        '🌊': '<i class="fas fa-waves"></i>',    # Olas
        '🕳️': '<i class="fas fa-dot-circle"></i>', # Vacío/Agujero
        '🔥': '<i class="fas fa-fire"></i>',     # Fuego
        '💀': '<i class="fas fa-skull"></i>',    # Calavera
        '⏰': '<i class="fas fa-clock"></i>',    # Tiempo
        '🌌': '<i class="fas fa-stars"></i>',    # Cosmos/Espacio
        
        # Armaduras
        '🐋': '<i class="fas fa-whale"></i>',    # Ballena/Leviatán
        '👑': '<i class="fas fa-crown"></i>',    # Corona
        
        # Objetos mágicos
        '🦜': '<i class="fas fa-crow"></i>',     # Loro/Pájaro
        '🐒': '<i class="fas fa-monkey"></i>',   # Mono
        '🧭': '<i class="fas fa-compass"></i>',  # Brújula
        '🗺️': '<i class="fas fa-map"></i>',      # Mapa
        '🍶': '<i class="fas fa-flask"></i>',    # Botella
        '🎲': '<i class="fas fa-dice"></i>',     # Dados
        '🚢': '<i class="fas fa-ship"></i>',     # Barco
        '🐚': '<i class="fas fa-shell"></i>',    # Caracola
        '🪢': '<i class="fas fa-rope"></i>',     # Cuerda
        '⏳': '<i class="fas fa-hourglass"></i>', # Reloj de arena
        
        # Monedas y oro
        '💰': '<i class="fas fa-coins"></i>',    # Monedas de oro
        '💎': '<i class="fas fa-gem"></i>',      # Gemas
    }
    
    # Leer el archivo
    with open('equipos.js', 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Reemplazar cada emoji por su icono correspondiente
    for emoji, icon in emoji_to_icon.items():
        content = content.replace(emoji, icon)
    
    # Escribir el archivo modificado
    with open('equipos.js', 'w', encoding='utf-8') as file:
        file.write(content)
    
    print("✅ Conversión completada!")
    print(f"🔄 Se reemplazaron {len(emoji_to_icon)} tipos de emojis por iconos Font Awesome")
    
    # Mostrar algunos ejemplos de los cambios
    print("\n📝 Ejemplos de conversiones:")
    for emoji, icon in list(emoji_to_icon.items())[:5]:
        print(f"   {emoji} → {icon}")

if __name__ == "__main__":
    convert_emojis_to_icons()