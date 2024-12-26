import 'package:flutter/material.dart';

class TitleWidget extends StatelessWidget {
  const TitleWidget({super.key});

  @override
  Widget build(BuildContext context) {
    final textSize = MediaQuery.of(context).size.width > 600 ? 48.0 : 38.0;

    return Text(
      'Yuda F.M',
      style: TextStyle(fontSize: textSize),
    );
  }
}
