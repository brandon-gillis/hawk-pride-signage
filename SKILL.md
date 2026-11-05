---
name: hawk-pride-signage-design
description: Use this skill to generate well-branded physical signage and assets for Hawk Pride Offroad (trail street signs, Dibond board signs, trail markers, legends, maps), either for production print files or throwaway mocks. Contains the trail rating system, colors, type, fonts, sign geometry, icons and React sign components.
user-invocable: true
---

Read the readme.md file within this skill (it is the overview and file index), and explore the other available files.
**For any sign request, follow NEW_SIGN_INSTRUCTIONS.md step by step** (intake → sign type → inventory lookup → standard → output checklist). Every board sign request must produce a print-ready SVG at the exact sign size and 300 DPI, made with tools/boardSvgExport.js (see §9). Use the BoardSign / StreetSign / TrailMarker / RouteMarker components; they implement the standards.
If creating visual artifacts (sign mockups, print-ready sign art, legends, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.
If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

Hard rules for signs: difficulty color and shape always travel together (green circle, blue square, red diamond, purple double diamond); trail numbers go INSIDE the shape (TrailSymbol) on boards and markers; names never shrink (use a short sign name); street signs carry no symbol; the Green Line is a route (RouteBadge), not a trail; use trail data from TRAIL_INVENTORY (new numbers); destinations are black; access roads are brown (street sign) / black arrow (board) / gray line (map). Boards: fixed 4″ entry bands, sizes 24×6 (1 entry, no header), 24×12 (2), 24×16 (3), 24×20 (4), 24×24 (5); never shrink lettering, never exceed 24″ wide. All sign geometry is in inches — render components with a `ppi` prop.
