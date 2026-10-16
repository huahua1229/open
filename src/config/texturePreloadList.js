/**
 * Texture Preload List - ALL textures for the entire experience
 * Everything loads during the initial preloader for zero stutter when entering rooms.
 */

// Entrance scene textures
export const ENTRANCE_TEXTURES = [
    // Core
    '/open/textures/paper-texture.webp',
    // Doors
    '/open/textures/doors/frame_sketch.webp',
    '/open/textures/doors/door_left_sketch.webp',
    '/open/textures/doors/door_right_sketch.webp',
    '/open/textures/doors/handle_left_sketch.webp',
    '/open/textures/doors/handle_right_sketch.webp',
    '/open/textures/doors/door_back_left_sketch.webp',
    '/open/textures/doors/pien.webp',
    // Environment
    '/open/textures/entrance/wall_bricks_2.webp',
    '/open/textures/entrance/stone-path.webp',
    '/open/textures/entrance/floor_paper.webp',
    '/open/textures/entrance/belka.webp',
    '/open/textures/entrance/sign.webp',
    // Characters/Objects
    '/open/textures/entrance/cat_front_body.webp',
    '/open/textures/entrance/window_sketch.webp',
    '/open/textures/entrance/avatar_window.webp',
    '/open/textures/entrance/tree_sketch.webp',
    '/open/textures/entrance/mouse_hanging.webp',
    '/open/textures/entrance/pot_with_duck.webp',
    '/open/textures/entrance/bug_sketch.webp',
    '/open/textures/entrance/speech_bubble.webp',
    // Images
    '/open/images/ink-splash.webp',
];

// Corridor scene textures
export const CORRIDOR_TEXTURES = [
    // Walls/Floor/Ceiling
    '/open/textures/corridor/wall_texture.webp',
    '/open/textures/corridor/kawalekpodlogi.webp',
    '/open/textures/corridor/texturadoprogow.webp',
    '/open/textures/corridor/texturadrewnadonozekbiurka.webp',
    '/open/textures/corridor/ceiling_texture.webp',
    '/open/textures/corridor/avatar_sketch.webp',
    // Double doors (end of corridor)
    '/open/textures/corridor/doors/frame_sketch.webp',
    '/open/textures/corridor/doors/doorrleft.webp',
    '/open/textures/corridor/doors/dorright.webp',
    '/open/textures/corridor/doors/handle_left_sketch.webp',
    '/open/textures/corridor/doors/handle_right_sketch.webp',
    '/open/textures/corridor/doors/pien.webp',
    // Single side doors
    '/open/textures/corridor/doors/ramkasingledoors.webp',
    '/open/textures/corridor/doors/klamkadodrzwi.webp',
    '/open/textures/corridor/doors/backsingledoors.webp',
    '/open/textures/corridor/doors/drzwiprojekty.webp',
    '/open/textures/corridor/doors/studio_door_sketch.png',
    '/open/textures/corridor/doors/drzwiabout.webp',
    '/open/textures/corridor/doors/drzwikontakt.webp',
    '/open/textures/corridor/doors/drzwiprojekty_painted.webp',
    '/open/textures/corridor/doors/studio_door_painted.png',
    '/open/textures/corridor/doors/drzwiabout_painted.webp',
    '/open/textures/corridor/doors/drzwikontakt_painted.webp',
    // Signs
    '/open/textures/corridor/pustatabliczka.webp',
    // Decorations
    '/open/textures/corridor/decorations/while_true_loop.webp',
    '/open/textures/corridor/decorations/coffee_debug.webp',
    '/open/textures/corridor/decorations/idea_process.webp',
    '/open/textures/corridor/decorations/paper_ball.webp',
    '/open/textures/corridor/decorations/paper_airplane.webp',
    '/open/textures/corridor/decorations/pencil.webp',
    '/open/textures/corridor/decorations/coffee_cup.webp',
    // CorridorDecorations - frames, furniture, lamps
    '/open/textures/corridor/ramkanazdjecieduza.webp',
    '/open/textures/corridor/ramkanazdjecieduza_painted.webp',
    '/open/textures/corridor/ramkanazdjeciemala.webp',
    '/open/textures/corridor/drzewkowdoniczce.webp',
    '/open/textures/corridor/kratkawentylacyjna.webp',
    '/open/textures/corridor/kwiatekwdoniczce.webp',
    '/open/textures/corridor/kratanalampy.webp',
    '/open/textures/corridor/bokilampy.webp',
    '/open/textures/corridor/gorastolika.webp',
    '/open/textures/corridor/szafkaprzod.webp',
    '/open/textures/corridor/szafkaprzodgora.webp',
    '/open/textures/corridor/rysuneknaobraz1.webp',
    '/open/textures/corridor/rysuneknaobrazek3.webp',
    '/open/textures/corridor/chibi_girl_v2.webp',
    '/open/textures/corridor/chibi_girl_v2_painted.webp',
    // DoorSection extras
    '/open/textures/corridor/strzalka.webp',
    '/open/textures/corridor/doors/door_back.webp',
    '/open/textures/corridor/doors/klamkadodrzwi_painted.webp',
];

// Standard HTML Image assets (preloaded via new Image() in App.jsx)
export const IMAGE_ASSETS = [
    '/open/images/avatar-thinking.webp',
    '/open/images/avatar-hero.webp',
    '/open/images/ink-splash.webp',
    '/open/images/map.webp',
    '/open/images/map_about_painted.webp',
    '/open/images/map_contact_painted.webp',
    '/open/images/map_gallery_painted.webp',
    '/open/images/map_studio_painted.webp',
    '/open/images/pin.webp',
    '/open/images/pin-slot.webp',
];

// Additional textures from App.jsx and avatar animations
export const UI_TEXTURES = [
    '/open/textures/corridor/avatar_anim/1.webp',
    '/open/textures/corridor/avatar_anim/2.webp',
    '/open/textures/corridor/avatar_anim/3.webp',
    '/open/textures/corridor/avatar_anim/4.webp',
    '/open/textures/corridor/avatar_anim/5.webp',
    '/open/textures/corridor/avatar_anim/6.webp',
    '/open/textures/corridor/avatar_anim/7.webp',
    '/open/textures/corridor/avatar_anim/8.webp',
    '/open/textures/corridor/avatar_anim/9.webp',
];

// ============================================
// ROOM TEXTURES - Preloaded for instant room entry
// ============================================

// Gallery Room textures (loaded via useTexture / drei)
// These are organized to handle conditional painted vs standard versions
export const GALLERY_TEXTURES_BASE = [
    '/open/textures/gallery/floor.webp',
    '/open/textures/gallery/railing.webp',
    '/open/textures/gallery/domki.webp',
    '/open/textures/gallery/miastotlo.webp',
    '/open/textures/gallery/bird_gray.webp',
    '/open/textures/gallery/klamerka.webp',
    '/open/textures/gallery/openliveproject.webp',
];

export const GALLERY_TEXTURES_VERSIONED = [
    // Project cards
    'monetuneprzod',
    'timberkittyprzod',
    'youngmultiprzod',
    'bioprzod',
    // Card back
    'tylkartki',
    'przyciskdotylukartki',
    // Tech stack logos
    'csslogo',
    'elementorlogo',
    'firebaselogo',
    'htmllogo',
    'jslogo',
    'netlifylogo',
    'phplogo',
    'reactlogo',
    'tailwindlogo',
    'wordpresslogo',
];

export const GALLERY_TEXTURES = [
    ...GALLERY_TEXTURES_BASE,
    ...GALLERY_TEXTURES_VERSIONED.flatMap(name => [
        `/open/textures/gallery/${name}.webp`,
        name === 'csslogo' ? `/open/textures/gallery/css3logo_painted.webp` : `/open/textures/gallery/${name}_painted.webp`
    ])
];

// Contact Room textures (loaded via useTexture / drei)
export const CONTACT_TEXTURES = [
    '/open/textures/contact/faletopdown.webp',
    '/open/textures/contact/molo.webp',
    '/open/textures/contact/latarnia.webp',
    '/open/textures/contact/statek.webp',
    '/open/textures/contact/paper_form.webp',
    '/open/textures/contact/send_button.webp',
    '/open/textures/contact/beczka.webp',
    '/open/textures/contact/beczka_painted.webp',
];

// About Room textures (loaded via useLoader(TextureLoader))
export const ABOUT_TEXTURES = [
    // Avatar
    '/open/textures/about/awatarnachmurce.webp',
    // Awards
    '/open/textures/about/SOTY.webp',
    '/open/textures/about/SOTY_painted.webp',
    '/open/textures/about/SOTD.webp',
    '/open/textures/about/SOTD_painted.webp',
    '/open/textures/about/SOTM.webp',
    '/open/textures/about/SOTM_painted.webp',
    '/open/textures/about/button.webp',
    '/open/textures/about/button_painted.webp',
    // Award images (for overlay)
    '/open/textures/about/SOTDAYYOUNGMULTICSSWINNER.webp',
    '/open/textures/about/SOTDAYYOUNGMULTIGSAP.webp',
    '/open/textures/about/SOTDAYYOUNGMULTIORPETRON.webp',
    '/open/textures/about/SOTDAYYOUNGMULTIDESIGNNOMINESS.webp',
    // Journey islands
    '/open/textures/about/uowyspa.webp',
    '/open/textures/about/freelancewyspa.webp',
    // Skill balloons - large
    '/open/textures/about/reactduzybalon.webp',
    '/open/textures/about/reactduzybalon_painted.webp',
    '/open/textures/about/threejsduzybalon.webp',
    '/open/textures/about/threejsduzybalon_painted.webp',
    '/open/textures/about/GSAPduzybalon.webp',
    '/open/textures/about/GSAPduzybalon_painted.webp',
    // Skill balloons - medium
    '/open/textures/about/JSSREDNIBALON.webp',
    '/open/textures/about/JSSREDNIBALON_painted.webp',
    '/open/textures/about/csssrednibalon.webp',
    '/open/textures/about/csssrednibalon_painted.webp',
    '/open/textures/about/nextjssrednibalon.webp',
    '/open/textures/about/nextjssrednibalon_painted.webp',
    // Skill balloons - small
    '/open/textures/about/htmlmalybalon.webp',
    '/open/textures/about/htmlmalybalon_painted.webp',
    '/open/textures/about/gitmalybalon.webp',
    '/open/textures/about/gitmalybalon_painted.webp',
    '/open/textures/about/figmamalybalon.webp',
    '/open/textures/about/figmamalybalon_painted.webp',
    '/open/textures/about/firebasemalybalon.webp',
    '/open/textures/about/firebasemalybalon_painted.webp',
    // Clouds
    '/open/textures/clouds/1131c3eb-dfae-423f-924b-ff39d8ccd6dc.webp',
    '/open/textures/clouds/254b8ec8-d6f7-4275-956f-7bab65b2ce2d.webp',
    '/open/textures/clouds/2cc88dd1-483c-466d-b07e-f8308c61ccbe.webp',
    '/open/textures/clouds/5606fcc0-3252-447d-a58a-7bcbac73229a.webp',
    '/open/textures/clouds/7882dc72-3d01-41fb-ac0e-d07b0184ebc1.webp',
    '/open/textures/clouds/9b2ca72f-7bd0-473b-ba6e-dd9e0eb79d35.webp',
    '/open/textures/clouds/c83293c6-d90c-4a32-8d9d-5ac9af7e2296.webp',
    '/open/textures/clouds/f6e358bc-d27c-41dd-95f4-6787a835c41e.webp',
];

// Studio Room textures (loaded via useLoader(TextureLoader))
export const STUDIO_TEXTURES = [
    // Monitor (blog)
    '/open/textures/studio/monitor_front.webp',
    '/open/textures/studio/monitor_front_painted.webp',
    '/open/textures/studio/monitor_back.webp',
    '/open/textures/studio/monitor_back_painted.webp',
    '/open/textures/studio/monitor_top.webp',
    '/open/textures/studio/monitor_top_painted.webp',
    '/open/textures/studio/monitor_bottom.webp',
    '/open/textures/studio/monitor_bottom_painted.webp',
    '/open/textures/studio/monitor_left.webp',
    '/open/textures/studio/monitor_left_painted.webp',
    '/open/textures/studio/monitor_right.webp',
    '/open/textures/studio/monitor_right_painted.webp',
    // TV (youtube)
    '/open/textures/studio/tv_front.webp',
    '/open/textures/studio/tv_front_painted.webp',
    '/open/textures/studio/tv_back.webp',
    '/open/textures/studio/tv_back_painted.webp',
    '/open/textures/studio/tv_top.webp',
    '/open/textures/studio/tv_top_painted.webp',
    '/open/textures/studio/tv_bottom.webp',
    '/open/textures/studio/tv_bottom_painted.webp',
    '/open/textures/studio/tv_side.webp',
    '/open/textures/studio/tv_side_painted.webp',
    // Phone (tiktok)
    '/open/textures/studio/phone_front.webp',
    '/open/textures/studio/phone_front_painted.webp',
    '/open/textures/studio/phone_back.webp',
    '/open/textures/studio/phone_back_painted.webp',
    '/open/textures/studio/phone_side.webp',
    '/open/textures/studio/phone_side_painted.webp',
    // Custom content front textures
    '/open/textures/studio/monitorfront_postnafbdoublewinner.webp',
    '/open/textures/studio/monitorfront_postnafbdoublewinner_painted.webp',
    '/open/textures/studio/phonefront_followmeontiktok.webp',
    '/open/textures/studio/phonefront_followmeontiktok_painted.webp',
    '/open/textures/studio/tvfront_filmikedytowaniezdjec.webp',
    '/open/textures/studio/tvfront_filmikedytowaniezdjec_painted.webp',
    '/open/textures/studio/tvfront_filmikprojektdlamultiego.webp',
    '/open/textures/studio/tvfront_filmikprojektdlamultiego_painted.webp',
];

// ============================================
// COMBINED EXPORTS
// ============================================

// Textures loaded via useTexture (drei) - entrance, corridor, UI, gallery, contact
export const PRELOAD_ALL = [
    ...ENTRANCE_TEXTURES,
    ...CORRIDOR_TEXTURES,
    ...UI_TEXTURES,
    ...GALLERY_TEXTURES,
    ...CONTACT_TEXTURES,
    ...IMAGE_ASSETS,
];


// Textures loaded via useLoader(TextureLoader) - about, studio
export const PRELOAD_LOADER = [
    ...ABOUT_TEXTURES,
    ...STUDIO_TEXTURES,
];

/**
 * Filters the preload list based on whether the device supports hover (desktop) 
 * or is a touch-only device (mobile/tablet).
 * @param {string[]} list The list of texture paths to filter
 * @param {boolean} usePainted Whether to prioritize _painted versions
 * @returns {string[]} The filtered list
 */
export const filterTexturesByDevice = (list, usePainted) => {
    // 1. Identify all paths that have a _painted version available
    const paintedVersions = new Set(list.filter(p => p.includes('_painted.webp')));
    
    // Also include the special css3logo case
    const hasCss3Painted = list.some(p => p.includes('css3logo_painted.webp'));
    
    return list.filter(path => {
        const isPainted = path.includes('_painted.webp');
        const isCss3 = path.includes('css3logo_painted.webp');
        
        // Find the "standard" version for this path if it's a painted one
        let standardVersion = null;
        if (isPainted) {
            standardVersion = path.replace('_painted.webp', '.webp');
        } else if (isCss3) {
            standardVersion = path.replace('css3logo_painted.webp', 'csslogo.webp');
        } else {
            // Check if this standard path HAS a painted version in the list
            const pVersion = path.replace('.webp', '_painted.webp');
            const css3Version = path.replace('csslogo.webp', 'css3logo_painted.webp');
            if (list.includes(pVersion) || (path.includes('csslogo.webp') && hasCss3Painted)) {
                // Return true to keep the standard version! Both desktop and mobile need it.
                return true; 
            }
            // If it doesn't have a painted version, it's a static texture (always keep)
            return true;
        }

        // It's a painted version
        return usePainted;
    });
};
