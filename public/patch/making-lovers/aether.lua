-- Making*Lovers: use the installed Chinese patch's GBK text.
-- Aether already mounts MakingLoversGBK.exe and its external patch packages.
-- Keep the game's text-encoding setting on Auto so this default takes effect.
assert(aether.api_version == 1, "Aether Lua API v1 is required")
assert(aether.engine == "bgi", "This patch is for the BGI engine")

aether.set_encoding("GBK")
aether.log("Making*Lovers: Chinese patch text uses GBK")
