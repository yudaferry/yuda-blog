{ 
  # pkgs ? import (fetchTarball "https://github.com/NixOS/nixpkgs/tarball/nixos-24.11") {}
  pkgs ? import <nixpkgs> {}
}:

pkgs.mkShellNoCC {
  packages = with pkgs; [
    git
    bun
  ];

  NIX_SHELL=true;

  shellHook = ''
    export PS1="[nix] yuda-blog $ ";
  '';
}


