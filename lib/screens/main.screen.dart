import 'package:flutter/material.dart';
import 'package:yuda_blog/widgets/title.widget.dart';
import 'package:yuda_blog/widgets/top_menu.widget.dart';

class MainScreen extends StatelessWidget {
  const MainScreen({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        children: [
          Expanded(
            child: Align(
              alignment: Alignment.topCenter,
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  TitleWidget(),
                  // SizedBox(height: 16),
                  // Container(
                  //   width: 450, // total width for 3 menus
                  //   child: Divider(thickness: 2),
                  // ),
                  SizedBox(height: 16),
                  TopMenuWidget(),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
