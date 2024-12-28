import 'package:flutter/material.dart';
import 'package:yuda_blog/widgets/title.widget.dart';
import 'package:yuda_blog/widgets/top_menu.widget.dart';

class MainScreen extends StatelessWidget {
  const MainScreen({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    final topMargin = MediaQuery.of(context).size.width > 600 ? 16.0 : 8.0;
    return Scaffold(
      body: Container(
        width: double.infinity,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            SizedBox(height: topMargin),
            TitleWidget(),
            TopMenuWidget(),
          ],
        ),
      ),
    );
  }
}
