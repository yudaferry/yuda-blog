import 'package:flutter/material.dart';

class TopMenuWidget extends StatelessWidget {
  const TopMenuWidget({super.key});

  @override
  Widget build(BuildContext context) {
    final menuItemStyle = TextStyle(
      fontSize: MediaQuery.of(context).size.width > 600 ? 24 : 12,
    );

    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        SizedBox(
          width: 150,
          child: TextButton(
            child: Text('About', style: menuItemStyle),
            onPressed: () {},
          ),
        ),
        SizedBox(
          width: 150,
          child: TextButton(
            child: Text('Portfolio', style: menuItemStyle),
            onPressed: () {},
          ),
        ),
        SizedBox(
          width: 150,
          child: TextButton(
            child: Text('Blog', style: menuItemStyle),
            onPressed: () {},
          ),
        ),
      ],
    );
  }
}
