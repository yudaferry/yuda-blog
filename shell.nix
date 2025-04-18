{ 
  pkgs ? import <nixpkgs> {}
}:

pkgs.mkShellNoCC {
  packages = with pkgs; [
    bun
  ];

  NIX_SHELL=true;

  shellHook = ''
    export PS1="[nix] yuda-blog $ ";
  '';
}
